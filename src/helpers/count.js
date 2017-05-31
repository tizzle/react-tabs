import React from 'react';
import TabList from '../components/TabList';
import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';

export function getTabsCount(children) {
  const childrenArray = Array.isArray(children) ? children : React.Children.toArray(children);

  const tabLists = childrenArray.filter(x => x.type === TabList);

  if (tabLists[0]) {
    const item = tabLists[0];
    const tabListsChildren = item.props.children ? item.props.children : item.children;
    const isArray = Array.isArray(tabListsChildren);
    const tabListsChildrenArray = isArray
      ? tabListsChildren
      : React.Children.toArray(tabListsChildren);
    const tabs = tabListsChildrenArray.filter(x => x.type === Tab);
    return tabs.length;
  }

  return 0;
}

export function getPanelsCount(children) {
  const childrenArray = Array.isArray(children) ? children : React.Children.toArray(children);
  const panels = childrenArray.filter(x => x.type === TabPanel);
  return panels.length;
}
