import req from './https'

export const getAllMembers = () => {
    return req('get', `/api/member/getAllMembers`)
};

export const addNewMember = (memberInfo) => {
    return req('post', `/api/member/addNewMember`, {
        studentId: memberInfo.studentId,
        name: memberInfo.name
    })
};

export const deleteAsset = (id) => {
    return req('post', `/api/member/delete/${id}`)
};

export const addRoleToMember = (studentId, roleName) => {
    return req('post', `/api/member/addRoleToMember`, {
        studentId: studentId,
        roleName: roleName
    })
};

export const editMember = (editedMember) => {
    return req('put', `/api/member/edit/${editedMember.id}?studentId=${editedMember.studentId}&name=${editedMember.name}`)
};

export const demoteMember = (id, roleName) => {
    return req('post', `/api/member/demote/${id}?roleName=${roleName}`)
};