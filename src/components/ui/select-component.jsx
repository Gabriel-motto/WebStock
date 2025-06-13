export function SelectComponent({ values, dataFromChild }) {
    const handleChange = (event) => {
        const value = event.target.value;
        dataFromChild(value);
    };

    return (
        <select onInput={handleChange}>
            <option value="">Selecciona una opción</option>
            {values.map((value) => (
                <option
                    key={value}
                    value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}
