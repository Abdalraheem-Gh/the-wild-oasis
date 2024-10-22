import styled, { css } from "styled-components";

const Heading=styled.h1`
${(props)=>props.as==='h1'&&
css`    
font-size:4rem;
font-weight:600;
@media (max-width: 768px){
    font-size:2rem;
    font-weight:300;
}
`}
${(props)=>props.as==='h2'&&
css`    
font-size:3rem;
font-weight:600;
@media (max-width: 768px){
    font-size:1.5rem;
    font-weight:300;
}
`}
${(props)=>props.as==='h3'&&
css`    
font-size:1rem;
font-weight:300;
@media (max-width: 768px){
    font-size:0.5rem;
    font-weight:300;
}
`}

${(props)=>props.as==='h4'&&
css`    font-size:3rem;
font-weight:600;
text-align: center;
@media (max-width: 768px){
    font-size:1.5rem;
    font-weight:300;
    text-align: center;

}
`}

`

export default Heading