import "./Select.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import {
    Stack,
    HStack,
    Separator,
    Input,
    InputGroup,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

export function Select({ values, dataFromChild, ...props }) {
    const [selectedValues, setSelectedValues] = useState([]);

    const addSelectedValues = (newValue) => {
        setSelectedValues((prevValues) => [...prevValues, newValue]);
    };

    const removeSelectedValues = (valueToRemove) => {
        setSelectedValues((prevValues) =>
            prevValues.filter((value) => value !== valueToRemove)
        );
    };

    // Filter values based on search input
    const handleSearch = (value) => {
        const filteredValues = values.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        const options = document.querySelector(".options");

        // Clear current options except the search input
        Array.from(options.children).forEach((child) => {
            if (!child.classList.contains("search-input-group")) {
                child.remove();
            }
        });

        // Add filtered options in div components
        if (filteredValues.length > 0) {
            filteredValues.forEach((item) => {
                const div = document.createElement("div");
                div.classList.add("item");
                div.innerText = item.name;
                div.addEventListener("click", () =>
                    handleSelectClick(item.name)
                );
                options.appendChild(div);
            });
        } else {
            // If no results, add a message
            const noResultsDiv = document.createElement("div");
            noResultsDiv.classList.add("item");
            noResultsDiv.innerText = "No hay resultados";
            options.appendChild(noResultsDiv);
        }
    };

    // Opens select menu
    const handleOpenSelect = () => {
        const options = document.querySelector(".options");
        options.classList.toggle("options--active");
    };

    // Set selected item to filter data
    const handleSelectClick = (value) => {
        selectedValues.includes(value)
            ? removeSelectedValues(value)
            : addSelectedValues(value);
    };

    const handleFilterClose = (value) => {
        removeSelectedValues(value);
    };

    useEffect(() => {
        dataFromChild(selectedValues);
    }, [selectedValues]);

    const ref = useClickAway(() => {
        const options = document.querySelector(".options");
        options.classList.remove("options--active");
    });

    const SelectList = () => {
        return (
            <>
                {values.map((value, index) => (
                    <div
                        className="item"
                        onClick={() => handleSelectClick(value.name)}
                        key={index}>
                        {value.name}
                        {selectedValues.includes(value.name) ? (
                            <FaCheck className="selected-icon" />
                        ) : null}
                    </div>
                ))}
            </>
        );
    };

    return (
        <Stack direction={{ base: "column", md: "row" }}>
            <div
                ref={ref}
                className="custom-select"
                {...props}>
                <HStack
                    className="selected-item"
                    onClick={handleOpenSelect}>
                    <Text className="text-selected">Selecciona una línea</Text>
                    <HStack className="separator-icon">
                        <Separator
                            orientation="vertical"
                            height="5"
                            size="md"
                        />
                        <IoIosArrowDown />
                    </HStack>
                </HStack>
                <div className="options">
                    <InputGroup
                        startElement={<IoSearch className="search-icon" />}
                        className="search-input-group">
                        <Input
                            className="search-input"
                            placeholder="Buscar..."
                            variant="flushed"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </InputGroup>
                    <SelectList />
                </div>
            </div>
            <div className="grid-item-filter">
                {selectedValues.length > 0
                    ? selectedValues.map((value) => (
                          <div
                              className="item-filter"
                              onClick={() => handleFilterClose(value)}>
                              <Text truncate>{value}</Text>
                              <IoIosClose className="item-filter-icon" />
                          </div>
                      ))
                    : null}
            </div>
        </Stack>
    );
}
