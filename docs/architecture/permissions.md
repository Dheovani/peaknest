# Permission model

An authenticated account is not automatically a verified professional. Every protected operation must check the server-derived actor, workspace membership, professional credential and scope, active enrollment, resource owner, purpose, and an unexpired, unrevoked category grant when student data sharing requires one. Workspace ownership alone does not grant unrestricted access to health data.

Client-supplied user IDs, roles, workspace IDs, and grant IDs are lookup inputs, never authority. Cross-tenant and IDOR/BOLA attempts must receive non-disclosing denials. Revocation takes effect on the next read. Significant permission and prescription changes produce metadata-only audit events. Implement and test these rules in the Identity & Workspaces slice before adding protected routes.
