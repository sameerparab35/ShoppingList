import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ShoppingService } from 'src/shopping.service';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction } from '../actions/shopping.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects {

    constructor(private actions$: Actions, private shoppingService: ShoppingService) {
    }

    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItems().pipe(
                    map(data => new LoadShoppingSuccessAction(data),
                        catchError(error => of(new LoadShoppingFailureAction(error))
                        )
                    )
                )
            ));

    @Effect() addShopping$ = this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            mergeMap(
                (data) => this.shoppingService.addShoppingItem(data.payload).pipe(
                    map(() => new AddItemSuccessAction(data.payload)),
                    catchError(error => of(new AddItemFailureAction(error)))
                )
            )
        );


    @Effect() deleteShopping$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
            mergeMap(
                (data) => this.shoppingService.deleteShoppingItem(data.payload).pipe(
                    map(() => new DeleteItemSuccessAction(data.payload),
                        catchError(error => of(new DeleteItemFailureAction(error))
                        )
                    )
                )
            ));

}