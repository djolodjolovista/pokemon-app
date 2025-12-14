import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 16px;

  @media (max-width: 600px) {
    padding: 12px;
    gap: 20px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`

export const Artwork = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    width: 140px;
    height: 140px;
  }
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 24px;
    text-align: center;
  }
`

export const Card = styled.section`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`

export const SectionTitle = styled.h2`
  margin-bottom: 14px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 18px;
  }
`

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const StatLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: capitalize;
`

export const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const ProgressBar = styled.div`
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.border};
  overflow: hidden;
`

export const Progress = styled.div<{ width: number; type: string }>`
  width: ${({ width }) => width}%;
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary};
  transition: width 0.4s ease;
`

export const EvolutionText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

export const FlavorText = styled.p`
  font-size: 17px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};

  @media (max-width: 600px) {
    font-size: 15px;
  }
`

export const MovesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const MoveItem = styled.li`
  padding: 8px 14px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`