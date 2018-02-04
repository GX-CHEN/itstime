export function findItemByName(name, scheduleList) {
  for(let index in scheduleList) {
    console.log('schedule  name', scheduleList[index], scheduleList[index].scheduleName, name )
    if(scheduleList[index].scheduleName == name) {
      console.log('return here')
      return scheduleList[index].scheduleItems;
    }
  }
}

export function updateItemByName(name, newItems, scheduleList) {
  for(let index in scheduleList) {
    if(scheduleList[index].scheduleName == name) {
      scheduleList[index].scheduleItems = newItems;
    }
  }
  return scheduleList;
}