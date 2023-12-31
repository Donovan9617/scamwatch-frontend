import * as yup from "yup";
import { FilteredCaseDateType } from "./types";

export const CASE_STATUS_ENUM = {
  NONE: "None",
  ACTIVATED: "Activated",
  PENDING: "Pending",
  REJECTED: "Rejected",
  CLOSED: "Closed",
} as const;

export const FILTERED_CASE_STATUS_ENUM = {
  NONE: "none",
  ACTIVATED: "activated",
  PENDING: "pending",
  REJECTED: "rejected",
  CLOSED: "closed",
} as const;

export const CASE_DESCRIPTION = {
  EMPTY: "",
} as const;

export const FILTERED_CASE_DATE_EMPTY = {
  startDate: "",
  endDate: "",
} as FilteredCaseDateType;

export const CASE_DATE_ENUM = {
  NEW_TO_OLD: "Newest to Oldest",
  OLD_TO_NEW: "Oldest to Newest",
} as const;

export const SORT_CASE_DATE_ENUM = {
  NEW_TO_OLD: "newtoold",
  OLD_TO_NEW: "oldtonew",
} as const;

export const NAV_ITEMS_ENUM = {
  DASHBOARD: "dashboard",
  CHARTS: "charts",
} as const;

export const CASE_SCAMTYPE_ENUM = {
  NONE: "",
  JOB_SCAM: "Job Scam",
  INVESTMENT_SCAM: "Investment Scam",
  LOVE_SCAM: "Love Scam",
  ECOMMERCE_SCAM: "E-Commerce Scam",
  LOTTERY_SCAM: "Lottery Scam",
  PARCEL_SCAM: "Parcel Scam",
  TECH_SUPPORT_SCAM: "Tech Support Scam",
  PHISHING_SCAM: "Phishing Scam",
  IDENTITY_THEFT: "Identity Theft",
  CREDIT_CARD_SCAM: "Credit Card Scam",
  OTHERS: "Others",
} as const;

export const BANK_ACCOUNT_ENUM = {
  NONE: "",
  DBS: "DBS",
  OCBC: "OCBC",
  UOB: "UOB",
  STANDARD_CHARTERED: "Standard Chartered",
  CITIBANK: "Citibank",
  HSBC: "HSBC",
  MAYBANK: "Maybank",
  BANK_OF_CHINA: "Bank of China",
  CIMB: "CIMB",
  BANK_OF_AMERICA: "Bank of America",
} as const;

export const CASE_FORM_SCHEMA = yup.object().shape({
  datereferral: yup.date().required("Date referral is required"),
  scamtype: yup.string().required("Scam type is required"),
  bankaccount: yup.string().required("Bank account is required"),
  bankaccountnumber: yup.string().required("Bank account number is required"),
  amountscammed: yup.number().required("Amount scammed is required"),
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[89]\d{7}$/,
      "Phone number must be 8 digits starting with 8 or 9"
    ),
  assignee: yup.string().required("Assignee is required"),
  status: yup.string().required("Case status is required"),
  description: yup.string().required("Case description is required"),
  casefile: yup.mixed().optional(),
});
