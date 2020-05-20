import { EventType } from "../constants/constants";

export const getEventTypeName = (type) => EventType[type];

export const getTimeDropdownValues = () => {
  let hours, minutes, ampm;
  const values = [];
  for(var i = 0; i <= 1415; i += 15){
      hours = Math.floor(i / 60);
      minutes = i % 60;
      if (minutes < 10){
          minutes = '0' + minutes; // adding leading zero
      }
      ampm = hours % 24 < 12 ? 'AM' : 'PM';
      hours = hours % 12;
      if (hours === 0){
          hours = 12;
      }
     
    values.push(hours + ':' + minutes + ' ' + ampm)
  }
  return values;
}