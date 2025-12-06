/* eslint-disable @typescript-eslint/no-use-before-define */
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const { t } = useTranslation('global')
  const generatePages = () => {
    const pages: (number | string)[] = []

    pages.push(1)

    if (page > 3) pages.push('left-ellipsis')

    const candidates = [page - 1, page, page + 1]

    const valid = candidates.filter((p) => typeof p === 'number' && p > 1 && p < totalPages)

    pages.push(...valid)

    if (page < totalPages - 2) pages.push('right-ellipsis')

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const pages = generatePages()

  return (
    <Wrapper>
      <NavButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        {t('prev', 'Prev')}
      </NavButton>

      <Pages>
        {pages.map((p) =>
          typeof p === 'string' ? (
            <Ellipsis key={p}>…</Ellipsis>
          ) : (
            <PageButton key={`page-${p}`} $active={p === page} onClick={() => onPageChange(p)}>
              {p}
            </PageButton>
          ),
        )}
      </Pages>

      <NavButton disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        {t('next', 'Next')}
      </NavButton>
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;

  @media (max-width: 480px) {
    gap: 4px;
  }
`

const Pages = styled.div`
  display: flex;
  gap: 6px;

  @media (max-width: 480px) {
    gap: 4px;
  }
`

const NavButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  white-space: nowrap;
  transition: 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonColor};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 12px;
  }
`

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  border: 1px solid ${({ theme, $active }) => ($active ? theme.primary : theme.border)};
  background: ${({ theme, $active }) => ($active ? theme.primary : theme.card)};
  color: ${({ theme, $active }) => ($active ? theme.buttonColor : theme.text)};

  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonColor};
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 12px;
  }
`

const Ellipsis = styled.span`
  padding: 8px 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: 480px) {
    padding: 6px 4px;
    font-size: 12px;
  }
`
