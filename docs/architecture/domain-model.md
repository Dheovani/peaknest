# Domain model outline

The candidate entities are enumerated in section 7 of the technical specification. The first web identity slice creates Better Auth `user`, `account`, `session`, and `verification` tables. A user is a single personal identity; no professional role is inferred from signup. The remaining Identity & Workspaces work will introduce professional profiles, verification states, workspaces, memberships, invitations, enrollments, grants, and audit events with stable identifiers and UTC timestamps.

Later slices will preserve immutable published workout/nutrition versions, exact-version session references, editable personal workout forks with immutable source links, actual execution records, and quantified food diary entries with units and source versions. Active-student capacity counts distinct accepted active enrollments per workspace; pending invitations count zero. Student-owned history survives enrollment and subscription changes.
