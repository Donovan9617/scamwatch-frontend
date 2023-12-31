import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  CASE_STATUS_ENUM,
  FILTERED_CASE_STATUS_ENUM,
  SORT_CASE_DATE_ENUM,
} from "../../types/enums";
import { CaseDataDashboardType } from "../../types/types";
import { CaseActivationButton } from "../casebutton/caseactivationbutton";
import { CaseCloseButton } from "../casebutton/caseclosebutton";
import { CaseRejectedButton } from "../casebutton/caserejectedbutton";
import { FilterContext } from "../filtercontext";
import { CasePagination } from "./casepagination/casepagination";

interface CaseTableProps {
  caseData: CaseDataDashboardType[] | undefined;
}

export const CaseTable: React.FC<CaseTableProps> = ({
  caseData,
}: CaseTableProps) => {
  const [caseDataToShow, setCaseDataToShow] = useState<
    CaseDataDashboardType[] | undefined
  >([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const {
    filteredCaseStatus,
    searchedCaseDescription,
    filteredCaseDate,
    sortedCaseDate,
  } = useContext(FilterContext);

  const caseTableStyle: React.CSSProperties = { textAlign: "center" };
  const caseTableHeaderRowStyle: React.CSSProperties = {
    backgroundColor: "#d0d0d0",
  };
  const caseTableDataStyle: React.CSSProperties = {
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
  const caseTableActionDataStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
  };

  const handleViewCaseInfo: (caseid: string) => void = (caseid) => {
    return navigate(`/case/${caseid}`);
  };

  const formatDateReferral: (datereferral: Date) => string = (datereferral) => {
    return (
      datereferral.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      datereferral.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
    );
  };

  useEffect(() => {
    // Filter
    let filteredCaseStatusData = caseData;
    switch (filteredCaseStatus) {
      case FILTERED_CASE_STATUS_ENUM.ACTIVATED:
        filteredCaseStatusData = caseData?.filter(
          (caseItem) => caseItem.status === CASE_STATUS_ENUM.ACTIVATED
        );
        break;
      case FILTERED_CASE_STATUS_ENUM.PENDING:
        filteredCaseStatusData = caseData?.filter(
          (caseItem) => caseItem.status === CASE_STATUS_ENUM.PENDING
        );
        break;
      case FILTERED_CASE_STATUS_ENUM.REJECTED:
        filteredCaseStatusData = caseData?.filter(
          (caseItem) => caseItem.status === CASE_STATUS_ENUM.REJECTED
        );
        break;
      case FILTERED_CASE_STATUS_ENUM.NONE:
        filteredCaseStatusData = caseData;
        break;
      default:
        break;
    }

    // Search
    let searchedCaseDescriptionData = filteredCaseStatusData;
    if (searchedCaseDescription) {
      searchedCaseDescriptionData = filteredCaseStatusData?.filter(
        (caseItem) => {
          return caseItem.description.includes(searchedCaseDescription);
        }
      );
    }

    // Sort
    let sortedCaseDateData = searchedCaseDescriptionData
      ? [...searchedCaseDescriptionData].sort((a, b) => {
          if (sortedCaseDate === SORT_CASE_DATE_ENUM.OLD_TO_NEW) {
            return a.datereferral.getTime() - b.datereferral.getTime();
          } else if (sortedCaseDate === SORT_CASE_DATE_ENUM.NEW_TO_OLD) {
            return b.datereferral.getTime() - a.datereferral.getTime();
          } else {
            return 0;
          }
        })
      : [];

    setCaseDataToShow(sortedCaseDateData);
  }, [
    caseData,
    filteredCaseStatus,
    searchedCaseDescription,
    filteredCaseDate,
    sortedCaseDate,
  ]);

  return (
    <div style={caseTableStyle}>
      <Table bordered responsive>
        <thead>
          <tr style={caseTableHeaderRowStyle}>
            <th style={{ width: "15%" }}>Date Referral</th>
            <th style={{ width: "15%" }}>Case ID</th>
            <th style={{ width: "20%" }}>Description</th>
            <th style={{ width: "15%" }}>Scam Type</th>
            <th style={{ width: "15%" }}>Assignee</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {caseDataToShow &&
            (caseDataToShow.length > 0 ? (
              caseDataToShow.slice(startIndex, endIndex).map((caseDataItem) => (
                <tr key={caseDataItem.caseid}>
                  <td style={{ ...caseTableDataStyle }}>
                    {formatDateReferral(caseDataItem.datereferral)}
                  </td>
                  <td
                    style={{
                      ...caseTableDataStyle,
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewCaseInfo(caseDataItem.caseid)}
                  >
                    <u>{caseDataItem.caseid}</u>
                  </td>
                  <td style={{ ...caseTableDataStyle }}>
                    {caseDataItem.description}
                  </td>
                  <td style={{ ...caseTableDataStyle }}>
                    {caseDataItem.scamtype}
                  </td>
                  <td style={{ ...caseTableDataStyle }}>
                    {caseDataItem.assignee}
                  </td>
                  <td style={{ ...caseTableDataStyle }}>
                    {caseDataItem.status}
                  </td>
                  <td style={{ width: "1%" }}>
                    {caseDataItem.status === CASE_STATUS_ENUM.PENDING ? (
                      <div style={caseTableActionDataStyle}>
                        <CaseActivationButton data={caseDataItem} />
                        <CaseRejectedButton data={caseDataItem} />
                      </div>
                    ) : caseDataItem.status === CASE_STATUS_ENUM.ACTIVATED ? (
                      <div style={caseTableActionDataStyle}>
                        <CaseCloseButton data={caseDataItem} />
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr
                style={{
                  ...caseTableDataStyle,
                  textAlign: "center",
                }}
              >
                <td colSpan={7}>No current cases</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CasePagination
        caseData={caseData}
        caseDataToShow={caseDataToShow}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
