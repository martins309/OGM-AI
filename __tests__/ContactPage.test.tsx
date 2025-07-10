// this will test the form and data and all tha
import  ContactPage  from "../src/components/ContactPage"
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent} from "@testing-library/react"


describe('Contact Form',() => {
    it('renders the contact from ', () =>{
        render(<ContactPage/>)
    })
    
})