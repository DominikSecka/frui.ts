import { IPagingFilter, IPagingInfo } from "./types";

type onPageChangedHandler = (offset: number, limit: number) => void;

export interface IPagerProps {
  paging: IPagingInfo;
  filter?: IPagingFilter;
  onPageChanged?: onPageChangedHandler;
}

const defaultPageSize = 25;
export function pageChangedHandler(newPageNumber: number, filter: IPagingFilter, onPageChanged: onPageChangedHandler) {
  return () => handlePageChanged(newPageNumber, filter, onPageChanged);
}

export function handlePageChanged(newPageNumber: number, filter?: IPagingFilter, onPageChanged?: onPageChangedHandler) {
  const pageSize = (filter && filter.limit) || defaultPageSize;
  const offset = (newPageNumber - 1) * pageSize;

  handlePagingChanged(offset, pageSize, filter, onPageChanged);
}

export function handlePageSizeChanged(
  newPageSize: number,
  filter?: IPagingFilter,
  onPageChanged?: onPageChangedHandler
) {
  handlePagingChanged(0, newPageSize, filter, onPageChanged);
}

export function handlePagingChanged(
  offset: number,
  limit: number,
  filter?: IPagingFilter,
  onPageChanged?: onPageChangedHandler
) {
  if (filter) {
    filter.offset = offset;
    filter.limit = limit;
  }

  if (onPageChanged) {
    onPageChanged(offset, limit);
  }
}
