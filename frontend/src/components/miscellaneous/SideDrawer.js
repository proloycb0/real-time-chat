import React, { useState } from 'react';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { user } = ChatState();
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const handleSearch = () => {

    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search users to chat" hasArrow placement='bottom-end'>
                    <Button onClick={onOpen} variant="ghost">
                        <i class="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans">
                    Talk-A-Real
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box display='flex' pb={2}>
                                <Input
                                    placeholder='Search by name or email'
                                    mr={2}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    onClick={handleSearch}
                                >Go</Button>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default SideDrawer;