// URL parameter utilities for navigation

export function createUrlParams(searchParams, updates) {
  const params = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }
  });

  return params;
}

export function getPageFromParams(searchParams, defaultPage = 1) {
  return Number(searchParams.get("page")) || defaultPage;
}

export function getPerPageFromParams(searchParams, defaultPerPage = 10) {
  return Number(searchParams.get("per_page")) || defaultPerPage;
}

export function getStatusFromParams(searchParams, defaultStatus = "all") {
  return searchParams.get("status") || defaultStatus;
}
