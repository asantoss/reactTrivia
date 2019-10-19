import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 10px;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	font-weight: bold;
	.input {
		display: flex;
		flex-direction: column;
		align-items: center;
		label {
			padding: 15px;
			margin: 10px;
			font-size: 18px;
		}
	}
`;

export const Input = styled.input`
	width: 250px !important;

	padding: 12px 20px;
	margin: 3px auto;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
`;

export const Button = styled.button`
	background-color: #4caf50;
	border-radius: 10px;
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	cursor: pointer;
	width: 100px;

	&:hover {
	}

	&:hover {
	}
`;

export const StyledimgC = styled.div`
	text-align: center;
	margin: 24px 0 12px 0;
`;

export const StyledImg = styled.img`
	width: 20%;
	border-radius: 20%;
`;

export const Container = styled.div`
	padding: 16px;
`;

export const Cancelbtn = styled.button`
	width: auto;
	padding: 10px 18px;
	background-color: #f44336;
`;

export const Span = styled.span`
	float: right;
	padding-top: 16px;
`;
