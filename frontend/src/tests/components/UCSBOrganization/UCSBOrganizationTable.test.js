import {  render } from "@testing-library/react";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";
import UCSBOrganizationTable from "main/components/UCSBOrganization/UCSBOrganizationTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
 
 
const mockedNavigate = jest.fn();
 
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedNavigate
}));
 
describe("UCSBOrganizationTable tests", () => {
 const queryClient = new QueryClient();
 
 
 test("renders without crashing for empty table with user not logged in", () => {
   const currentUser = null;
 
   render(
     <QueryClientProvider client={queryClient}>
       <MemoryRouter>
         <UCSBOrganizationTable ucsbOrganizations={[]} currentUser={currentUser} />
       </MemoryRouter>
     </QueryClientProvider>
 
   );


 });
 test("renders without crashing for empty table for ordinary user", () => {
   const currentUser = currentUserFixtures.userOnly;
 
   render(
     <QueryClientProvider client={queryClient}>
       <MemoryRouter>
         <UCSBOrganizationTable ucsbOrganizations={[]} currentUser={currentUser} />
       </MemoryRouter>
     </QueryClientProvider>
 
   );

 });
 
 test("renders without crashing for empty table for admin", () => {
   const currentUser = currentUserFixtures.adminUser;
 
   render(
     <QueryClientProvider client={queryClient}>
       <MemoryRouter>
         <UCSBOrganizationTable ucsbOrganizations={[]} currentUser={currentUser} />
       </MemoryRouter>
     </QueryClientProvider>
 
   );

 });
 
 test("Has the expected column headers and content for adminUser", () => {
 
   const currentUser = currentUserFixtures.adminUser;
 
   const { getByText, getByTestId } = render(
     <QueryClientProvider client={queryClient}>
       <MemoryRouter>
         <UCSBOrganizationTable ucsbOrganizations={ucsbOrganizationFixtures.threeOrganizations} currentUser={currentUser} />
       </MemoryRouter>
     </QueryClientProvider>
 
   );
 
 
   const expectedHeaders = ['orgCode',  'orgTranslationShort', 'orgTranslation','Inactive?'];
   const expectedFields = ['orgCode', 'orgTranslationShort','orgTranslation', 'inactive'];
   const testId = "UCSBOrganizationTable";
 
   expectedHeaders.forEach((headerText) => {
     const header = getByText(headerText);
     expect(header).toBeInTheDocument();
   });
 
   expectedFields.forEach((field) => {
     const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
     expect(header).toBeInTheDocument();
   });
 
   expect(getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("testCode2");
   expect(getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent("testCode3");
   expect(getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent("orgTransShort_1");
   expect(getByTestId(`${testId}-cell-row-1-col-orgTranslationShort`)).toHaveTextContent("orgTransShort_2");
 
   // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
   // expect(editButton).toBeInTheDocument();
   // expect(editButton).toHaveClass("btn-primary");
 
   const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
   expect(deleteButton).toBeInTheDocument();
   expect(deleteButton).toHaveClass("btn-danger");
 
 });
 // test("Edit button navigates to the edit page for admin user", async () => {
 
 //   const currentUser = currentUserFixtures.adminUser;
 
 //   const { getByTestId } = render(
 //     <QueryClientProvider client={queryClient}>
 //       <MemoryRouter>
 //         <UCSBDatesTable diningCommons={ucsbDatesFixtures.threeDates} currentUser={currentUser} />
 //       </MemoryRouter>
 //     </QueryClientProvider>
 
 //   );
 
 //   await waitFor(() => { expect(getByTestId(`UCSBDatesTable-cell-row-0-col-id`)).toHaveTextContent("1"); });
 
 //   const editButton = getByTestId(`UCSBDatesTable-cell-row-0-col-Edit-button`);
 //   expect(editButton).toBeInTheDocument();
  
 //   fireEvent.click(editButton);
 
 //   await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/ucsbdates/edit/1'));
 
 // });
 
 
});
 