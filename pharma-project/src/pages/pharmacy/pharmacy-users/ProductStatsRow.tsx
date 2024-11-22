type RequestRowProps = {
    name: string,
    available_points: number,
    used_points: number,
    total_points: number
};
export default function ProductStatsRow(props: RequestRowProps) {
    return (
        <div className="grid grid-cols-4 gap-4 bg-green-1 p-4 w-auto items-center text-green-3 rounded">
            <div className="overflow-hidden">{props.name}</div>
            <div className="overflow-hidden">{props.available_points}</div>
            <div className="overflow-hidden">{props.used_points}</div>
            <div className="overflow-hidden">{props.total_points}</div>
        </div>
    );
}