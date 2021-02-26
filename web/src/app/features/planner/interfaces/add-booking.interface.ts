import {Resource} from '../../resources/state';
import * as moment from 'moment';

export interface AddBooking {
  source: moment.Moment;
  resource?: Resource;
}
