import styled from "styled-components"

interface PropsButton {
  primary?: boolean
}

export const Component = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Head = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #e67f0d;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  justify-content: space-between;
  max-height: 30px;
`
export const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
export const Content = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Button = styled.button`
  background-color: ${(props: PropsButton) => (props.primary ? "#e67f0d" : "#fff")};
  color: ${(props: PropsButton) => (props.primary ? "#fff" : "#e67f0d")};
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: 2px solid ${(props: PropsButton) => (props.primary ? "#fff" : "#e67f0d")};
  margin: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
`
export const BackButton = styled.div`
  background-color: #fff;
  color: #e67f0d;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: 2px solid #e67f0d;
  margin: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  left: 10px;
`
