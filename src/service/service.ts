import { Observable } from 'rxjs';

/**
 * Interfaccia che rappresenta un generico Service
 * 
 * @author Francesco, Gianni, Marco
 *
 * @param <DTO> DTO generico
 * @param <T> Tipo generico dell'id
 */
export interface Service<DTO, T> {

    read(id: T): Observable<DTO> ;

    delete(id: T): Observable<any>;

    update(dto: DTO): Observable<any> ;

    insert(dto: DTO): Observable<any>;

    getAll(): Observable<DTO[]>;

}
