import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";

export default function HelpRequestTable({ helpRequest, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdates/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    // "explanation": "string",
    // "id": 0,
    // "requestTime": "2022-11-10T21:58:48.752Z",
    // "requesterEmail": "string",
    // "solved": true,
    // "tableOrBreakoutRoom": "string",
    // "teamId": "string"

    const columns = [
        {
            Header: 'Explanation',
            accessor: 'explanation', // accessor is the "key" in the data
        },
        {
            Header: 'id',
            accessor: 'id',
        },
        {
            Header: 'Request Time',
            accessor: 'requestTime',
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Solved',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved)
        },
        {
            Header: 'Table Or Breakout Room',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'Team Id',
            accessor: 'teamId',
        }
    ];

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
    //     ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;

    return <OurTable
        data={helpRequest}
        columns={columnsToDisplay}
        testid={"HelpRequestTable"}
    />;
};