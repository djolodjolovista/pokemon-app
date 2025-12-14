import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`

export const ModalCard = styled.div<{ $typeColor: string }>`
  width: 420px;
  padding: 26px;
  border-radius: 18px;
  position: relative;

  background: ${({ $typeColor }) => `
    linear-gradient(135deg, ${$typeColor}55, ${$typeColor} 90%)
  `};

  border: 4px solid ${({ $typeColor }) => $typeColor};
  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.3);

  animation: fadeIn 0.2s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ErrorBox = styled.div`
  background: #ffdddd;
  padding: 12px;
  border-radius: 8px;
  color: #a33;
  width: 100%;
  text-align: center;
`

export const Title = styled.h2`
  text-transform: capitalize;
  text-align: center;
  font-size: 28px;
  color: white;
  margin-bottom: 16px;
`

export const ImageRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
`

export const SpriteWrapper = styled.div`
  width: 110px;
  height: 110px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.25),
    0 4px 8px rgba(0, 0, 0, 0.2);
`

export const Sprite = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  image-rendering: pixelated;
`

export const StatsBox = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.25);
  padding: 18px;
  border-radius: 14px;
  backdrop-filter: blur(6px);
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 18px;
`

export const Label = styled.span`
  font-weight: 700;
`

export const Value = styled.span`
  opacity: 0.9;
`

export const MoreButton = styled.button`
  margin: 16px auto 0;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${({ theme }) => theme.buttonBackground};
  color: white;

  display: block;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonHoverBackground};

    transform: translateY(-1px);
  }

  &:active {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(0px);
  }
`