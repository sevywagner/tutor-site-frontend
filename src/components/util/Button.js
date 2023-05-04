import styled from 'styled-components'

const Button = styled.button`
    background-color: black;
    color: white;
    padding: 2.5vh;
    font-family: 'Comfortaa';
    font-size: 2.2vh;
    border: 1px solid white;
    border-radius: 4vh;

    &:hover {
        animation: hover .3s ease-in-out;
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    @keyframes hover {
        from {
            border: 1px solid white;
            background-color: black;
            color: white;
        }
    
        to {
            border: 1px solid black;
            background-color: white;
            color: black;
        }
    }
`;

export default Button;