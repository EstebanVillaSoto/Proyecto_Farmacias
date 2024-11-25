import { useContext, useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import RequestRow from "./RequestRow";
import Title from "../../../components/ui/Title";

import ClientNavbar from "../../../components/ClientNavbar";
import { UserContext } from "../../../App";
import { RequestSortByDateAsc, RequestSortByDateDesc, RequestSortByIdAsc, RequestSortByIdDesc, RequestSortDefault, RequestSortStrategy } from "../../../strategy/RequestSortStrategy";

export default function ClientRequests() {
    const [requests, setRequests] = useState<any[]>([]);
    
    const [searchValue, setSearchValue] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [sortStrategy, setSortStrategy] = useState<RequestSortStrategy>(new RequestSortDefault());
    
    const [user] = useContext(UserContext);

    const sortingStrategyMap = {
        "": new RequestSortDefault(),
        "date-asc": new RequestSortByDateAsc(),
        "date-desc": new RequestSortByDateDesc(),
        "id-asc": new RequestSortByIdAsc(),
        "id-desc": new RequestSortByIdDesc(),
    }
    
    useEffect(() => {
        fetchRequests();
    }, []); // Array vacío: se ejecuta solo una vez

    const fetchRequests = async () => {
        const response = await fetch(
            `https://pr-disenno-backend-production.up.railway.app/requests?user_id=${user.id}`
        );
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setRequests(data);
    };

    const searchRequests = async () => {
        if (searchValue === "") {
            fetchRequests();
            return;
        }
        const response = await fetch(
            `https://pr-disenno-backend-production.up.railway.app/requests?invoice_id=${searchValue}&user_id=${user.id}`
        );
        const data = await response.json();
        console.log(data);
        setRequests(sortStrategy.sort(data));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as keyof typeof sortingStrategyMap;
        setSortStrategy(sortingStrategyMap[value]);
        setRequests(sortStrategy.sort(requests));
    }
    return (
        <div className="flex flex-col justify-start items-center w-full">
            <ClientNavbar/>
            <Title title="My Requests" green="1" className="p-5"></Title>
            <SearchBar
                place_holder="Invoice ID"
                filter={false}
                onSearchChange={setSearchValue}
                onClickSearch={searchRequests}
                
                value={searchValue}/>
            
            {loading? <div><strong className="text-xl text-green-1">Loading...</strong></div> : (
                <>
                <div className="grid grid-cols-custom-1 gap-4 p-4 w-auto items-center text-green-1">
                    <div className="col-span-2">Invoice ID</div>
                    <div className="col-span-2">Product Name</div>
                    <div className="col-span-1">Request State</div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                        <select className="bg-green-3" name="sorting" onChange={handleSortChange}>
                            <option value="date-desc">
                                Date - Descending
                            </option>
                            <option value="date-asc">
                                Date - Ascending
                            </option>
                            <option value="id-desc">
                                ID - Descending
                            </option>
                            <option value="id-asc">
                                ID - Ascending
                            </option>
                        </select>
                    </div>{" "} 
                </div>
                <div className="flex flex-col gap-3 overflow-auto h-96">
                {/* Define una altura */}
                {requests.map((request: any) => {
                return (
                    <RequestRow
                        key={request.id}
                        request_id={request.id}
                        invoice_id={request.invoice_id}
                        product_name={request.product_name}
                        request_state={request.request_state}
                    />
                    );
                })}
                </div>
                </>

            )}

        </div>
    );
}
