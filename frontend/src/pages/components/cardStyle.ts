import styled from "styled-components"

export const Card = styled.div`
  padding: 0;
  margin: 20px;
  border: 1px solid #e67f0d;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`

export const Content = styled.div`
  padding: 20px 10px 20px 10px;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`

Content.defaultProps = {
  theme: {
    bgColor: "#fff",
  },
}

export const Partition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`
