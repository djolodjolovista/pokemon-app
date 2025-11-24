/* eslint-disable @typescript-eslint/no-use-before-define */
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/navigation/Navbar'

const MainLayout = () => (
  <Wrapper>
    <Navbar />
    <ContentWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
    </ContentWrapper>
  </Wrapper>
)

export default MainLayout

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`

const MainContent = styled.div`
  flex: 1;
  padding: 0px 24px 0px 24px;
  overflow-y: auto;
`
