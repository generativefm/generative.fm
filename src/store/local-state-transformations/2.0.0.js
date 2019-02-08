const renamePiecesTabToMusic = stateObj =>
  Object.assign({}, stateObj, {
    activeTabId:
      stateObj.activeTabId === 'pieces' ? 'music' : stateObj.activeTabId,
  });

export default [renamePiecesTabToMusic];
