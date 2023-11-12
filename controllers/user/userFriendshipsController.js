//userFriendships.controller.js
const User = require("../../models/user");

async function sendFriendRequest(senderId, receiverId) {
  // Add user to the pendingFriendRequests of another user,
  // and add the other user to the sentFriendRequests of the user.
  const receiverFilter = { _id: receiverId };
  const updateReceiver = {
    $push: { "friends.receivedFriendRequests": senderId },
  };
  const senderFilter = { _id: senderId };
  const updateSender = {
    $push: { "friends.pendingFriendRequests": receiverId },
  };
  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    const senderResult = await User.updateOne(senderFilter, updateSender);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function cancelFriendRequest(senderId, receiverId) {
  // Remove user from the pendingFriendRequests of another user,
  // and remove the other user from the sentFriendRequests of the user.
  const receiverFilter = { _id: receiverId };
  const updateReceiver = {
    $pull: { "friends.receivedFriendRequests": senderId },
  };
  const senderFilter = { _id: senderId };
  const updateSender = {
    $pull: { "friends.pendingFriendRequests": receiverId },
  };
  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    const senderResult = await User.updateOne(senderFilter, updateSender);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function acceptFriendRequest(senderId, receiverId) {
  // Add user to the friends list of another user,
  // and add the other user to the friends list of the user.
  // Then remove from pending and sent requests.
  // Remove user from the pendingFriendRequests of another user,
  // and remove the other user from the sentFriendRequests of the user.
  const receiverFilter = { _id: receiverId };
  const updateReceiver = {
    $pull: { "friends.pendingFriendRequests": senderId },
    $push: { "friends.friendsList": senderId },
  };
  const senderFilter = { _id: senderId };
  const updateSender = {
    $pull: { "friends.receivedFriendRequests": receiverId },
    $push: { "friends.friendsList": receiverId },
  };
  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    const senderResult = await User.updateOne(senderFilter, updateSender);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function rejectFriendRequest(senderId, receiverId) {
  // Remove user from the pendingFriendRequests of another user,
  // and remove the other user from the sentFriendRequests of the user.
  const receiverFilter = { _id: receiverId };
  const updateReceiver = {
    $pull: { "friends.pendingFriendRequests": senderId },
  };
  const senderFilter = { _id: senderId };
  const updateSender = {
    $pull: { "friends.receivedFriendRequests": receiverId },
  };
  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    const senderResult = await User.updateOne(senderFilter, updateSender);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function removeFromFriendsList(userId, friendId) {
  // Remove user from the friends list of another user,
  // and remove the other user from the friends list of the user.
  const receiverFilter = { _id: friendId };
  const updateReceiver = {
    $pull: { "friends.friendsList": userId },
  };
  const senderFilter = { _id: userId };
  const updateSender = {
    $pull: { "friends.friendsList": friendId },
  };
  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    const senderResult = await User.updateOne(senderFilter, updateSender);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function addToBlockList(blockerId, blockedUserId) {
  // Add user to the block list of another user,
  // and add the other user to the block list of the user.
  const receiverFilter = { _id: blockerId };
  const updateReceiver = {
    $push: { "blockedList": blockedUserId },
  };

  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

async function removeFromBlockList(blockerId, blockedUserId) {
  // Remove user from the block list of another user,
  // and remove the other user from the block list of the user.
  const receiverFilter = { _id: blockerId };
  const updateReceiver = {
    $pull: { "blockedList": blockedUserId },
  };

  try {
    const receiverResult = await User.updateOne(receiverFilter, updateReceiver);
    if (receiverResult.matchedCount === 1 && senderResult.matchedCount === 1) {
      // The update was successful
      console.log("Update successful");
    } else {
      // The update did not modify any documents (perhaps the senderId was not found)
      console.log("No documents were updated");
    }
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
  }
}

module.exports = {
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFromFriendsList,
  addToBlockList,
  removeFromBlockList
};