/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let curr = head;
  let prev = null;
  let next;
  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

while (csrIndex < csrIds.length) {
  let csrId = csrIds[csrIndex];
  const countOfBacklogChats = await chatService.getCountOfBacklogChatsForQueue(
    queueId,
    manager.managerId
  );
  if (countOfBacklogChats < 0) {
    logger.info("Backlog chats are present, not offering to csr");
    noChatsRemaining = true;
    break;
  }
  maxChatsToOffer = Math.min(maxChatsToOffer, countOfBacklogChats);
  const {
    bulkRoutingInitiationOutboundPayload,
    assignmentOutboundPayload,
    staggerStatistics,
    csr,
    alreadyOffered,
  } = await routingEngine.route_chat_for_csr(csrId, manager);

  if (assignmentOutboundPayload !== null) {
    await bulkOutboundDispatch(bulkRoutingInitiationOutboundPayload);
    await bulkOutboundDispatch([assignmentOutboundPayload]);
    // if (csr && csr.remainingCapacity - 1 > 0) {
    //   await delayedTrigger({
    //     managerId: manager.managerId,
    //     delay: manager.staggerInterval,
    //     expirationTimeout: manager.staggerInterval,
    //     csrId: csrId,
    //     // uuid: uuid,
    //     timerAction: TimerAction.REQUEUE,
    //   });
    // }
    if (assignmentOutboundPayload.queueId === queueId) {
      offerredChatInQueue++;
    }
    if (offerredChatInQueue >= maxChatsToOffer) {
      break;
    }
    if (assignmentOutboundPayload !== null && !alreadyOffered) {
      noChatsRemaining = true;
      break;
    }
  }
}

// async function handleCsrEvent(sqsEvent: SQSEvent, manager: Manager): Promise<void> {
//   let uuid: string, csrId: string;
//   try {
//     logger.info('sqsEvent:AssignmentLambda: ', { sqsEvent });
//     for (const record of sqsEvent.Records) {
//       let queueEvent: QueueEvent;
//       try {
//         queueEvent = JSON.parse(record.body) as QueueEvent;
//         csrId = queueEvent['csrId'];
//         uuid = queueEvent['uuid'];
//         logger.addPersistentLogAttributes({ managerId: manager.managerId, csrId: csrId, uuid });
//       } catch (err) {
//         logger.error('sqsEvent:AssignmentLambda: parsing error', err); // logger singleton ??
//         continue;
//       }
//       const routingEngine = new RoutingEngine();
//       logger.info('Routing chats for : csrId', { managerId: manager.managerId, csrId: csrId });

//       //   const {
//       //     bulkRoutingInitiationOutboundPayload,
//       //     bulkAssignmentOutboundPayload,
//       //     bulkCSRUnavailableOutboundPayload,
//       //     staggerStatistics,
//       //     bulkMaxWaitTimeExceededOutboundPayload,
//       //   } = await routingEngine.route_chats_all_queues(csrId);

//       const { bulkRoutingInitiationOutboundPayload, assignmentOutboundPayload, staggerStatistics } =
//         await routingEngine.route_chat_for_csr(csrId, manager);

//       await bulkOutboundDispatch(bulkRoutingInitiationOutboundPayload);
//       // assignmentOutboundPayload !== null ? await bulkOutboundDispatch([assignmentOutboundPayload]) : '';
//       //   await bulkOutboundDispatch(bulkMaxWaitTimeExceededOutboundPayload);
//       //   await bulkOutboundDispatch(bulkCSRUnavailableOutboundPayload);
//       //   const delayViaSQS = Math.ceil(staggerStatistics.minStaggerDelay > 900 ? 900 : staggerStatistics.minStaggerDelay);
//       //   logger.info('delayViaSQS ', { delayViaSQS });

//       if (assignmentOutboundPayload !== null) {
//         await bulkOutboundDispatch([assignmentOutboundPayload]);
//         logger.info('delayViaSQS Trigger', { staggerInterval: manager.staggerInterval });
//         await delayedTrigger({
//           managerId: manager.managerId,
//           delay: manager.staggerInterval,
//           expirationTimeout: manager.staggerInterval,
//           csrId: csrId,
//           uuid,
//           timerAction: TimerAction.REQUEUE,
//         });
//         // await triggerRoutingEvent(managerId, uuid, [queueId], delayViaSQS); // 5 seconds buffer
//       }
//       logger.removePersistentLogAttributes(['csrId']);
//     }
//   } catch (err) {
//     logger.error('Error Offering to Csr', err);
//   }
//   logger.clearPersistentLogs();
// }

// async function handleCsrsEvent(sqsEvent: SQSEvent): Promise<void> {
//   let uuid: string, csrId: string, csrIds: string[], managerId: string, manager: Manager;
//   try {
//     logger.info('sqsEvent:AssignmentLambda: ', { sqsEvent });

//     logger.info('sqsEvent:AssignmentLambda: ', { Records: sqsEvent.Records });
//     for (let record of sqsEvent.Records) {
//       let queueEvent: QueueEvent;
//       try {
//         queueEvent = JSON.parse(record.body) as QueueEvent;
//         // csrId = queueEvent['csrId'];
//         csrIds = queueEvent['csrIds'];
//         uuid = queueEvent['uuid'];
//         managerId = queueEvent['managerId'];
//         const managerService = new ManagerService();
//         manager = await managerService.getManagerConfig(managerId); // log error if Manager does not exists and skip

//         const { staggerInterval, appBaseUrl, allowToDecline } = manager;
//         logger.info(`Tenant stats: `, { staggerInterval, appBaseUrl, allowToDecline });
//         logger.addPersistentLogAttributes({
//           managerId,
//           staggerInterval,
//           appBaseUrl,
//           allowToDecline,
//         });

//         logger.addPersistentLogAttributes({ managerId: manager.managerId, uuid });
//       } catch (err) {
//         logger.error('sqsEvent:AssignmentLambda: parsing error', err); // logger singleton ??
//         continue;
//       }
//       const routingEngine = new RoutingEngine();

//       for (let csrId of csrIds) {
//         logger.addPersistentLogAttributes({ csrId });
//         logger.info('Routing chats for : csrId', { managerId: manager.managerId, csrId: csrId });

//         //   const {
//         //     bulkRoutingInitiationOutboundPayload,
//         //     bulkAssignmentOutboundPayload,
//         //     bulkCSRUnavailableOutboundPayload,
//         //     staggerStatistics,
//         //     bulkMaxWaitTimeExceededOutboundPayload,
//         //   } = await routingEngine.route_chats_all_queues(csrId);

//         const { bulkRoutingInitiationOutboundPayload, assignmentOutboundPayload, staggerStatistics } =
//           await routingEngine.route_chat_for_csr(csrId, manager);

//         await bulkOutboundDispatch(bulkRoutingInitiationOutboundPayload);
//         // assignmentOutboundPayload !== null ? await bulkOutboundDispatch([assignmentOutboundPayload]) : '';
//         //   await bulkOutboundDispatch(bulkMaxWaitTimeExceededOutboundPayload);
//         //   await bulkOutboundDispatch(bulkCSRUnavailableOutboundPayload);
//         //   const delayViaSQS = Math.ceil(staggerStatistics.minStaggerDelay > 900 ? 900 : staggerStatistics.minStaggerDelay);
//         //   logger.info('delayViaSQS ', { delayViaSQS });

//         if (assignmentOutboundPayload !== null) {
//           await bulkOutboundDispatch([assignmentOutboundPayload]);
//           logger.info('delayViaSQS Trigger', { staggerInterval: manager.staggerInterval });
//           await delayedTrigger({
//             managerId: manager.managerId,
//             delay: manager.staggerInterval,
//             expirationTimeout: manager.staggerInterval,
//             csrId: csrId,
//             uuid,
//             timerAction: TimerAction.REQUEUE,
//           });
//           // await triggerRoutingEvent(managerId, uuid, [queueId], delayViaSQS); // 5 seconds buffer
//         }
//         logger.removePersistentLogAttributes(['csrId']);
//       }
//     }
//   } catch (err) {
//     logger.error('Error Offering to Csr', err);
//   }
//   logger.clearPersistentLogs();
// }
// Wrap the handler with middy
export const handler = middy(lambdaHandler);
// csrId = assignmentEvent['csrId'];
// csrIds = assignmentEvent['csrIds'];

//--------------------------------------------------------------
// async customOfferChatDbUpdate(
//   chat: Chat,
//   csrId: string,
//   queueId: string,
//   managerId: string,
//   staggerInterval: number
// ): Promise<boolean> {
//   // Todo: update type

//   const chatId = chat.chatId;
//   logger.info(`offerChatDbUpdate input : `, {
//     chatId,
//     csrId,
//     queueId,
//     managerId,
//     staggerInterval,
//   });
//   const chatWaitTime = this.calculateWaitTimeAtOffered(chat);
//   await this.acceptChat(chatId, managerId, csrId, queueId, chatWaitTime, staggerInterval);
//   // await AppDataSource.transaction(async (transactionManager) => {
//   //   // const chat = await transactionManager.findOne(Chat, {
//   //   //   where: { chatId, managerId },
//   //   //   lock: { mode: 'pessimistic_write' },
//   //   // });
//   //   // if (chat?.offeredTo !== null || chat?.status !== ChatStatusEnum.BACKLOG) {
//   //   //   logger.info(`chat is already offered to a csr or `, chat);
//   //   //   throw new CustomRSError('chat is already offered to a csr or', responseCodes.BAD_REQUEST);
//   //   // }
//   //   // const csr = await transactionManager.findOne(CSR, {
//   //   //   where: { csrId, managerId },
//   //   //   lock: { mode: 'pessimistic_write' },
//   //   // });
//   //   // if (csr?.offeredChatId !== null || csr?.status !== CsrStatusEnum.AVAILABLE) {
//   //   //   logger.info(`CSR is already offered a chat or csr is not Available `, csr);
//   //   //   throw new CustomRSError('CSR is already offered a chat or csr is not Available ', responseCodes.BAD_REQUEST);
//   //   // }

//   //   // await this.updateChat(
//   //   //   {
//   //   //     status: ChatStatusEnum.OFFERED,
//   //   //     offeredTo: csrId,
//   //   //     updatedAt: getCurrentTime(),
//   //   //     offeredAt: getCurrentTime(),
//   //   //     waitTime: chatWaitTime,
//   //   //   },
//   //   //   chatId,
//   //   //   queueId,
//   //   //   managerId,
//   //   //   // Make sure the chat status is "Assigned", to prevent repeat transfer requests
//   //   //   [...chatTransitionRule[ChatStatusEnum.ASSIGNED], ChatStatusEnum.BACKLOG],
//   //   //   transactionManager,
//   //   //   { offeredTo: IsNull() }
//   //   // );
//   //   // await this.csrService.updateCSR(
//   //   //   { offeredChatId: chatId, staggerLockUntil: getTimeWithAddedSeconds(staggerInterval) },
//   //   //   csrId,
//   //   //   managerId,
//   //   //   [CsrStatusEnum.AVAILABLE],
//   //   //   transactionManager,
//   //   //   getTimeWithAddedSeconds(-1)
//   //   // );

//   //   await this.acceptChat(chatId, managerId, csrId, queueId, chatWaitTime);
//   //   // await this.updateChat(
//   //   //   {
//   //   //     status: ChatStatusEnum.ASSIGNED,
//   //   //     acceptedAt: getCurrentTime(),
//   //   //     assignedTo: csrId,
//   //   //     offeredTo: null,
//   //   //     transferToCsr: null,
//   //   //     transferToQueue: null,
//   //   //     updatedAt: getCurrentTime(),
//   //   //     waitTime: chatWaitTime,
//   //   //   },
//   //   //   chatId,
//   //   //   queueId,
//   //   //   managerId,
//   //   //   [ChatStatusEnum.OFFERED, ChatStatusEnum.BACKLOG],
//   //   //   transactionManager,
//   //   //   { offeredTo: IsNull(), assignedTo: IsNull() }
//   //   // );
//   //   // await this.queueStatService.handleQueueStat(
//   //   //   { managerId, queueId, chatWaitTime: chatWaitTime },
//   //   //   transactionManager
//   //   // );
//   //   // await this.managerStatService.handleManagerStat({ managerId, chatWaitTime: chatWaitTime }, transactionManager);

//   //   // await this.csrService.updateCSR(
//   //   //   { offeredChatId: null, staggerLockUntil: getTimeWithAddedSeconds(staggerInterval) },
//   //   //   csrId,
//   //   //   managerId,
//   //   //   [CsrStatusEnum.AVAILABLE, CsrStatusEnum.TEMP_UNAVAILABLE], // implement offered chat id matches by updating integration
//   //   //   transactionManager,
//   //   //   getTimeWithAddedSeconds(-1)
//   //   // );
//   //   // await this.consumeChatCapacities(chatId, csrId, queueId, managerId, transactionManager);
//   // });
//   logger.info(`offerChatDbUpdate succeeded : `, {
//     chatId,
//     csrId,
//     queueId,
//     managerId,
//     staggerInterval,
//   });
//   return true;
// }
