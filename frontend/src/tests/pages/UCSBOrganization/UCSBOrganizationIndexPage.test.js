import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBOrganizationIndexPage from "main/pages/UCSBOrganization/UCSBOrganizationIndexPage";
 
 
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";
 
 
const mockToast = jest.fn();
jest.mock('react-toastify', () => {
   const originalModule = jest.requireActual('react-toastify');
   return {
       __esModule: true,
       ...originalModule,
       toast: (x) => mockToast(x)
   };
});
 
// const mockedNavigate = jest.fn();
 
// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom'),
//    useNavigate: () => mockedNavigate
// }));
 
describe("UCSBOrganizationIndexPage tests", () => {
 
   const axiosMock =new AxiosMockAdapter(axios);
 
   const testId = "UCSBOrganizationTable";
 
   const setupUserOnly = () => {
       axiosMock.reset();
       axiosMock.resetHistory();
       axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
       axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
   };
 
   const setupAdminUser = () => {
       axiosMock.reset();
       axiosMock.resetHistory();
       axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
       axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
   };
 
   test("renders without crashing for regular user", () => {
       setupUserOnly();
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").reply(200, []);
 
       render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
   });
 
   test("renders without crashing for admin user", () => {
       setupAdminUser();
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").reply(200, []);
 
       render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
 
   });
  
   test("renders three UCSBOrganizations without crashing for regular user", async () => {
       setupUserOnly();
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);
 
       const { getByTestId } = render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
       await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("testCode2"); } );
       expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent("testCode3");
       expect(getByTestId(`${testId}-cell-row-2-col-orgCode`)).toHaveTextContent("testCode4");
 
   });
  
  
   test("renders three UCSBOrganizations without crashing for admin user", async () => {
       setupAdminUser();
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);
 
       const { getByTestId } = render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
       await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("testCode2"); });
       expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent("testCode3");
       expect(getByTestId(`${testId}-cell-row-2-col-orgCode`)).toHaveTextContent("testCode4");

        // expect(getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent("orgTransShort_1");
        // expect(getByTestId(`${testId}-cell-row-0-col-orgTranslation`)).toHaveTextContent("orgTrans_1");
        // expect(getByTestId(`${testId}-cell-row-0-col-Inactive?`)).toHaveTextContent("true");

   });
  
  
   test("renders empty table when backend unavailable, user only", async () => {
       setupUserOnly();
 
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").timeout();

       const restoreConsole = mockConsole();
 
       const { queryByTestId, getByText } = render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
       await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
 
       restoreConsole();
       const expectedHeaders = ['orgCode', 'orgTranslationShort', 'orgTranslation','Inactive?'];
       
        expectedHeaders.forEach((headerText) => {
            const header = getByText(headerText);
            console.log("\nheader: " + header + "\n");
            expect(header).toBeInTheDocument();
        });
        

       expect(queryByTestId(`${testId}-cell-row-0-col-orgCode`)).not.toBeInTheDocument();
   });
   
   test("test what happens when you click delete, admin", async () => {
    setupAdminUser();

    const queryClient = new QueryClient();
    axiosMock.onGet("/api/UCSBOrganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);
    axiosMock.onDelete("/api/UCSBOrganization", {params: {orgCode: "testCode2"}}).reply(200, "UCSBOrganization with id testCode2 was deleted");


    const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <UCSBOrganizationIndexPage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toBeInTheDocument(); });

   expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("testCode2"); 


    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
   
    fireEvent.click(deleteButton);

    await waitFor(() => { expect(mockToast).toBeCalledWith("UCSBOrganization with id testCode2 was deleted") });

});
   
   /*
   test("test what happens when you click edit as an admin", async () => {
       setupAdminUser();
 
       const queryClient = new QueryClient();
       axiosMock.onGet("/api/UCSBOrganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);
 
       const { getByTestId } = render(
           <QueryClientProvider client={queryClient}>
               <MemoryRouter>
                   <UCSBOrganizationIndexPage />
               </MemoryRouter>
           </QueryClientProvider>
       );
 
       await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toBeInTheDocument(); });
 
       expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("testCode2");
 
 
       const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
       expect(editButton).toBeInTheDocument();
     
       fireEvent.click(editButton);
 
       await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/UCSBOrganization/edit/testCode2'));
 
   });
   */
 
});
 