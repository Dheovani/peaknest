# Domain model outline

The candidate entities are enumerated in section 7 of the technical specification. No product tables are created in the foundation. The Identity & Workspaces slice will introduce users, professional profiles, verification states, workspaces, memberships, invitations, enrollments, grants, and audit events with UUID identifiers and UTC timestamps.

Later slices will preserve immutable published workout/nutrition versions, exact-version session references, editable personal workout forks with immutable source links, actual execution records, and quantified food diary entries with units and source versions. Active-student capacity counts distinct accepted active enrollments per workspace; pending invitations count zero. Student-owned history survives enrollment and subscription changes.
