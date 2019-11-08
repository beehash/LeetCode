/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一: 需要使用额外空间
var detectCycle = function(head) {
    const dataMap = new Map();
    while(head) {
        if(dataMap.has(head)) {
            return head;
        }
        dataMap.set(head, 1)
        head = head.next;
    }
    return null;
};
// 方法二:
var detectCycle = function(head) {
    const meetingNode = findMeetingNode(head);
    if(!meetingNode) return null;
    let nodesloop = 1;
    let pNext = meetingNode;
    while(pNext.next != meetingNode) {
        nodesloop++;
        pNext = pNext.next;
    }
    let pNode1 = head;
    let pNode2 = head;
    for(let i = 0; i < nodesloop; i++) {
        pNode1 = pNode1.next;
    }
    while(pNode1 !== pNode2) {
        pNode1 = pNode1.next;
        pNode2 = pNode2.next;
    }
    return pNode1;
}
function findMeetingNode(head) {
    if(!head) return null;
    let pSlow = head.next;
    if(!pSlow) return null;
    let pFast = pSlow.next;
    while(pSlow && pFast) {
        if(pSlow == pFast) {
            return pSlow;
        }
        pSlow = pSlow.next;
        pFast = pFast.next;
        if(pFast) {
            pFast = pFast.next;
        }
    }
    return null;
}