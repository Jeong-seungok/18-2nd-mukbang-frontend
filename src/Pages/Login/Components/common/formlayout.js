import React from 'react';
import styled from 'styled-components';

function FormLayout(props) {
  return (
    <FormBox>
      <SecitonBox>{props.children}</SecitonBox>
    </FormBox>
  );
}

export default FormLayout;

const FormBox = styled.div`
  width: 380px;
  height: 488px;
`;

const SecitonBox = styled.section`
  padding: 30px 23px 0px;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 6px;
`;
