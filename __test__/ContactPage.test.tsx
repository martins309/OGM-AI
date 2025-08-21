// this will test the form and data and all tha
import  ContactPage  from "../src/components/ContactPage"
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import { env } from '../env'


describe('Contact Form',() => {
    it('renders the contact from ', () =>{
        render(<ContactPage/>)

        expect(screen.getByLabelText(/Full Name */i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email Address /i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Company/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Service of Interest/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Message */i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /send message/i})).toBeInTheDocument()


    })

    it('displays error if the message is too short', async () => {
        render(<ContactPage/>)
        
        fireEvent.change(screen.getByLabelText(/Full Name/i), {target: {value: "John Doe"}})
        fireEvent.change(screen.getByLabelText(/Email Address/i), {target: {value: "john.doe@email.com"}})
        fireEvent.change(screen.getByLabelText(/Message/i), {target: {value: "What is up"}})
        fireEvent.change(screen.getByLabelText(/Security Question/i), {target: {value: "1000"}})

        fireEvent.submit(screen.getByRole('button', { name: /send message/i}))

       

    })     

    it('checks to see if the env vars are there', () => {
        
        

    })
   
})