import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 0 0 0;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
`

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    display: block;
    thead {
      display: none;
    }
    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    tr {
      display: block;
      background: ${({ theme }) => theme.card};
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 12px;
      padding: 12px;
    }
    td {
      display: flex;
      padding: 6px 0;
      border: none;
      font-size: 14px;
      text-transform: capitalize;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
  }
`

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: ${({ theme }) => theme.card};
  border-bottom: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`

export const Tr = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.background};
  }
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    td {
      color: #fff;
    }
  }
`

export const Td = styled.td<{ label?: string }>`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 6px 0;
    border-bottom: none;
    &::before {
      content: attr(data-label);
      font-weight: 600;
      margin-right: 8px;
    }
  }
`