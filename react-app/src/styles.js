import styled from 'styled-components'

// TODO: not realted to this file specifically, but bootstrap classes should be globally available.

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const Body = styled.div`
  width: 1200px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const Clickable = styled.div`
  cursor: pointer;
`

export const Rounded = styled.div`
  border-radius: 50%;
  overflow: hidden;
`
