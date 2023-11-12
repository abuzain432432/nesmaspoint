import { useState } from 'react';
import useAdminTable from '@/custom-hooks/useAdminTable';
import { IoIosArrowDown } from 'react-icons/io';
import DashboardAdminTable from './DashboardAdminTable';
import AdminUserRoleModal from './admin/AdminUserRoleModal';
const LIMIT = 10;
import { Tooltip } from 'antd';
function DashboardAdminUsers() {
  const [userRoleModal, setUserRoleModal] = useState(null);
  const {
    dataSource,
    totalPages,
    loading,
    setLoading,
    query,
    setQuery,
    handlePaginationChange,
    handleSort,
    setRefetchSignal,
    user,
  } = useAdminTable('users', LIMIT);
  const columns = [
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      width: '300px',
      render(email) {
        return (
          <div>
            {email?.length > 27 ? (
              <Tooltip title={email}>{`${email.slice(
                0,
                27
              )}...`}</Tooltip>
            ) : (
              email
            )}
          </div>
        );
      },
    },
    {
      title: 'FIRSTNAME',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LASTNAME',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'ACCOUNT',
      dataIndex: 'active',
      key: 'active',
      render(isActive) {
        return <div>{isActive ? 'active' : 'inactive'}</div>;
      },
    },

    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render(role, rowData) {
        return (
          <div
            onClick={() => setUserRoleModal(rowData)}
            className={`py-1 w-fit cursor-pointer rounded-full first-letter:uppercase ${
              role === 'admin'
                ? 'bg-[#67DB65]  px-4'
                : role === 'user'
                ? 'bg-[#DDD73D]  px-6'
                : 'bg-[#F99259]  px-5'
            }`}
          >
            <div className='flex items-center '>
              <span className='first-letter:uppercase'>{role}</span>
              <IoIosArrowDown />
            </div>
          </div>
        );
      },
    },
  ];
  const handleUserRoleModalCancel = () => {
    setUserRoleModal(null);
  };
  return (
    <>
      <AdminUserRoleModal
        setRefetchSignal={setRefetchSignal}
        setLoading={setLoading}
        loading={loading}
        userRoleModal={userRoleModal}
        onUserRoleModalCancel={handleUserRoleModalCancel}
        user={user}
      />
      <div className='bg-[#d9d9d98b] flex-1'>
        <DashboardAdminTable
          LIMIT={LIMIT}
          query={query}
          setQuery={setQuery}
          handleSort={handleSort}
          dataSource={dataSource}
          loading={loading}
          totalPages={totalPages}
          handlePaginationChange={handlePaginationChange}
          columns={columns}
          parms={'users'}
        />
      </div>
    </>
  );
}

export default DashboardAdminUsers;
