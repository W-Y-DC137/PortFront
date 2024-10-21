useEffect(() => {
    let filtered = tickets;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(ticket =>
            Object.values(ticket).some(val => 
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    // Apply column filter
    if (activeFilter.column && activeFilter.value) {
        filtered = filtered.filter(ticket => ticket[activeFilter.column] === activeFilter.value);
    }

    setFilteredTickets(filtered);
}, [searchTerm, activeFilter, tickets]);

const handleSearch = (e) => {
    setSearchTerm(e.target.value);
};

const handleFilter = (column, value) => {
    setActiveFilter({ column, value });
};