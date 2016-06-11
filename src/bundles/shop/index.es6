import * as ioCoreBootstrap  from 'iocore/core/bootstrap';
import * as constants  from 'iocore/core/constants';

/**
 * Basic Bootstrap, it can be changed whatever
 * developer needs during changing application
 */
export class Bootstrap extends ioCoreBootstrap.Bootstrap {

    constructor(...args)
    {
        super(...args);

        console.log('/modules/shop/bootstrap constructor');
    }

}
