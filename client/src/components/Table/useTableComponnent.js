import React, { useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

// Custom table hook
const useTableComponnent = (data, columns, pageSize = 10,keyField="_id") => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  

  return {
    data
  };
};

export default useTableComponnent;
