import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
// import {Table as TableBootsrap} from 'react-bootstrap/Table';
import makeData from "./makeData";
import PageHeader from "../PageHeader";

const serverData = makeData(10000);

const Table = () => {
    const columns = React.useMemo(
        () => [
          {
            Header: "Name",
            columns: [
              {
                Header: "First Name",
                accessor: "firstName"
              },
              {
                Header: "Last Name",
                accessor: "lastName"
              }
            ]
          },
          {
            Header: "Info",
            columns: [
              {
                Header: "Age",
                accessor: "age"
              },
              {
                Header: "Visits",
                accessor: "visits"
              },
              {
                Header: "Status",
                accessor: "status"
              },
              {
                Header: "Profile Progress",
                accessor: "progress"
              }
            ]
          }
        ],
        []
      );
    
      // We'll start our table without any data
      const [data, setData] = React.useState([]);
      const [loading, setLoading] = React.useState(false);
      const [pageCount, setPageCount] = React.useState(0);
      const fetchIdRef = React.useRef(0);
    
      const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.
    
        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current;
    
        // Set the loading state
        setLoading(true);
    
        // We'll even set a delay to simulate a server here
        setTimeout(() => {
          // Only update the data if this is the latest fetch
          if (fetchId === fetchIdRef.current) {
            const startRow = pageSize * pageIndex;
            const endRow = startRow + pageSize;
            setData(serverData.slice(startRow, endRow));
    
            // Your server could send back total page count.
            // For now we'll just fake it, too
            setPageCount(Math.ceil(serverData.length / pageSize));
    
            setLoading(false);
          }
        }, 1000);
      }, []);
    
      return (
        // <Styles>
          <Table1
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
          />
        // </Styles>
      );
};
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  function Table1({columns,data,fetchData,loading,pageCount: controlledPageCount}){
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }, // Pass our hoisted table state
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
        autoResetSelectedRows: false,
        getRowId: (row) => row.key,
      },
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );
  
    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
      fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);
  
    // Render the UI for your table
    return (
      <>
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre> */}
        <PageHeader _title={"הכלבים שלי"}/>
        <table className="table table-striped table-bordered table-hover w-85" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                  results
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {/* 
            Pagination can be built however you'd like. 
            This is just a very basic UI implementation:
          */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
export default Table;