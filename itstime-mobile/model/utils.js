export function findItemByName(name, scheduleList) {
  for (let index in scheduleList) {
    if (scheduleList[index].scheduleName == name) {
      return scheduleList[index].scheduleItems;
    }
  }
}

export function updateItemByName(name, newItems, scheduleList) {
  for (let index in scheduleList) {
    if (scheduleList[index].scheduleName == name) {
      scheduleList[index].scheduleItems = newItems;
    }
  }
  return scheduleList;
}