const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DSV = require('../../modules/dataServer.js');

module.exports = {
   name: 'jail',
   description: 'Jails a nasty troublemaker.',
   requirements: 'Role (Guard)',
   usage: '[user] [level of prison (1-3)]',
   example: 'Lanaar 2',
   execute(message, args) {
      const requiredArgs = [`who you want to jail`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      //Caller checks------------------------------------------------------------------------------------------------------------------------------
      const cmdCaller = C.dcGetMessageAuthorAsMember(message);
      const isOwner = CG.checkIfServerOwner(cmdCaller);

      //Must be the server owner OR must be a guard & can't be in the prison already
      if (!isOwner && !C.dcCheckIfMemberHasRoles(cmdCaller, DSV.roleGuard)) {
         C.dcRespondToMsg(message, `Really pushing your luck, huh? Guards get the reins, not you!`);
         return;
      }

      if (!isOwner && C.dcCheckIfMemberHasRoles(cmdCaller, DSV.rolePrisoners)) {
         C.dcRespondToMsg(message, `Attempting to jail someone while confined yourself? Looks like you're already behind those bars. Try again once you've earned your freedom!`);
         return;
      }

      //Target checks------------------------------------------------------------------------------------------------------------------------------
      const cmdTarget = C.getMemberByNameOrMention(message, args[1]);
      if (!cmdTarget) {
         return;
      }

      //Can't jail the Imperator or Tosche
      if (!isOwner && (CG.checkIfServerOwner(cmdTarget) || CG.checkIfTosche(cmdTarget))) {
         C.dcRespondToMsg(message, `Attempting to jail ${cmdTarget.displayName}? That's a new level of ambition! Congratulations, you've just earned a one-way ticket to <#${DSV.channelPrison1.id}>`);
         C.dcSwitchMemberRoles(cmdCaller, DSV.roleDefault, DSV.rolePrisoner1);
         return;
      }

      //Can't jail bots
      if (!isOwner && C.dcCheckIfMemberHasRoles(cmdTarget, DSV.roleBot)) {
         C.dcRespondToMsg(message, `This one has the Imperator's immunity!`);
         return;
      }

      //Can't jail other guards
      if (!isOwner && C.dcCheckIfMemberHasRoles(cmdTarget, DSV.roleGuard) && cmdCaller.id != cmdTarget.id) {
         C.dcRespondToMsg(message, `Nice try, but that's not how the guard duty works! Guards can't imprison their own!`);
         return;
      }

      let roleToSwitchTo;
      let channelToSendJailMsg;

      switch (args[2]) {
         case undefined:
         case '1':
            roleToSwitchTo = DSV.rolePrisoner1;
            channelToSendJailMsg = DSV.channelPrison1.id;
            break;

         case '2':
            roleToSwitchTo = DSV.rolePrisoner2;
            channelToSendJailMsg = DSV.channelPrison2.id;
            break;

         case '3':
            roleToSwitchTo = DSV.rolePrisoner3;
            channelToSendJailMsg = DSV.channelPrison3.id;
            break;

         default:
            C.dcRespondToMsg(message, `We don't have a prison level of ${args[2]}`);
            return;
      }

      if (cmdCaller.id == cmdTarget.id) {
         C.dcRespondToMsg(message, `Taking a vacation, are we? Then enjoy your own company in the comfort of our cold cell!`);
      }


      if (C.dcCheckIfMemberHasRoles(cmdTarget, roleToSwitchTo)) {
         C.dcRespondToMsg(message, `${cmdTarget.displayName} is already rotting there!`);
         return;
      }

      C.dcRemoveRolesFromMember(cmdTarget, DSV.rolePrisoners);
      C.dcSwitchMemberRoles(cmdTarget, DSV.roleDefault, roleToSwitchTo);

      const channelToSendWelcomeMsg = C.dcGetChannelByID(message, channelToSendJailMsg);
      C.dcSendMsgToChannel(channelToSendWelcomeMsg, `Welcome to your comfy cell, <@!${cmdTarget.id}>!`);
   },
}