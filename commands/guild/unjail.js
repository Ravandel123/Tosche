const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DSV = require('../../modules/dataServer.js');

module.exports = {
   name: 'unjail',
   description: 'Releases a nasty troublemaker from thier confinement.',
   requirements: 'Role (Guard)',
   usage: '[user]',
   example: 'Shereshoy',
   execute(message, args) {
      const requiredArgs = [`who you want to unjail`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      //Caller checks------------------------------------------------------------------------------------------------------------------------------
      const cmdCaller = C.dcGetMessageAuthorAsMember(message);
      const isOwner = CG.checkIfServerOwner(cmdCaller);

      //Must be the server owner OR must be a guard & can't be in the prison already
      if (!CG.checkIfServerOwner(cmdCaller) && !C.dcCheckIfMemberHasRoles(cmdCaller, DSV.roleGuard)) {
         C.dcRespondToMsg(message, `Really pushing your luck, huh? Guards get the reins, not you!`);
         return;
      }

      if (!isOwner && C.dcCheckIfMemberHasRoles(cmdCaller, DSV.rolePrisoners)) {
         C.dcRespondToMsg(message, `Attempting to unjail someone while confined yourself? Looks like you're already behind those bars. Try again once you've earned your freedom!`);
         return;
      }

      //Target checks------------------------------------------------------------------------------------------------------------------------------
      const cmdTarget = C.getMemberByNameOrMention(message, args[1]);
      if (!cmdTarget) {
         return;
      }

      let currentPrisonerRole;
      let currentPrisoneChannel;

      if (C.dcCheckIfMemberHasRoles(cmdTarget, DSV.rolePrisoner1)) {
         currentPrisonerRole = DSV.rolePrisoner1;
         currentPrisoneChannel = DSV.channelPrison1.id;
      } else if (C.dcCheckIfMemberHasRoles(cmdTarget, DSV.rolePrisoner2)) {
         currentPrisonerRole = DSV.rolePrisoner2;
         currentPrisoneChannel = DSV.channelPrison2.id;
      } else if (C.dcCheckIfMemberHasRoles(cmdTarget, DSV.rolePrisoner3)) {
         currentPrisonerRole = DSV.rolePrisoner3;
         currentPrisoneChannel = DSV.channelPrison3.id;
      } else {
         C.dcRespondToMsg(message, `Do you need glasses? <@!${cmdTarget.id}> is not in the prison!`);
         return;
      }

      C.dcRemoveRolesFromMember(cmdTarget, DSV.rolePrisoners);
      C.dcAddRolesToMember(cmdTarget, DSV.roleDefault);

      const channelToSendByeMsg = C.dcGetChannelByID(message, currentPrisoneChannel);
      C.dcSendMsgToChannel(channelToSendByeMsg, `Enough of you rotting there <@!${cmdTarget.id}>! Get out!`);
   },
}