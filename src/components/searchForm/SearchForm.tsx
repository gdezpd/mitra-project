import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { useDebounce } from "../../hooks/useDebounce";
import { searchValue } from "../../store/rootSlice";
import { useAppDispatch } from "../../store/store";


export const SearchForm = () => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value)

    useEffect(() => {
        dispatch(searchValue(debounceValue))
    }, [debounceValue])

    return (
        <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Search by title</Form.Label>
                <Form.Control
                    placeholder='Search'
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                />
            </Form.Group>
        </Form>
    )
}