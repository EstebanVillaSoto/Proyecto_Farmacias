export interface RequestSortStrategy {
    sort(requests: any[]): any[];
}

export class RequestSortDefault implements RequestSortStrategy {
    sort(requests: any[]): any[] {
        return requests.sort((a, b) => {
            return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
        });
    }
}

export class RequestSortByDateDesc implements RequestSortStrategy {
    sort(requests: any[]): any[] {
        return requests.sort((a, b) => {
            return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
        });
    }
}

export class RequestSortByDateAsc implements RequestSortStrategy {
    sort(requests: any[]): any[] {
        return requests.sort((a, b) => {
            return new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime();
        });
    }
}

export class RequestSortByIdDesc implements RequestSortStrategy {
    sort(requests: any[]): any[] {
        return requests.sort((a, b) => {
            return Number(b.invoice_id) - Number(a.invoice_id);
        });
    }
}

export class RequestSortByIdAsc implements RequestSortStrategy {
    sort(requests: any[]): any[] {
        return requests.sort((a, b) => {
            return Number(a.invoice_id) - Number(b.invoice_id);
        });
    }
}