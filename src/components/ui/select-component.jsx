export function SelectComponent({ values, dataFromChild, ...props }) {
    const handleChange = (event) => {
        const value = event.target.value;
        dataFromChild(value);
    };

    return (
        <select
            onInput={handleChange}
            {...props}>
            <option value="">Selecciona una opción</option>
            {values.map((value) => (
                <option
                    key={value.id}
                    value={value.name}>
                    {value.name}
                </option>
            ))}
        </select>
    );
}
