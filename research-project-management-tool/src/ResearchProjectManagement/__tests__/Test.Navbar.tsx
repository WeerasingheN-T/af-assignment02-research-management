import React from "react";
import { screen,render } from "@testing-library/react";
import Header from "../Header.js";

describe('Rending navbar',()=>{
    test('check elements',()=>{
        render(<Header/>);
    });
});