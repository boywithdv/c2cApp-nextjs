//ヘッダー
import Link from 'next/link'
import styled, { ThemeProvider } from 'styled-components'
import AppLogo from '../../Atoms/AppLogo'
import Button from '../../Atoms/Button'
import { SearchIcon,PersonIcon,ShoppingCartIcon } from '../../Atoms/IconButton'
import ShapeImage from '../../Atoms/ShapeImage'
import Spinner from '../../Atoms/Spinner'
import Text from '../../Atoms/Text'
import Box from '../../layout/Box'
import Flex from '../../layout/Flex'
import BadgeIconButton from '../../molecules/BadgeIconButton'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useShoppingCartContext } from '../../../contexts/ShoppingCartContext'
import { theme } from '../../../themes'
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
  }
`;
// ヘッダーのルート(大元)
//ヘッダー全体のスタイル定義 ---- 高さ、パディング、下部ボーダーなど設定
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`;

// ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`;

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * ヘッダー
 */
const Header = () => {
  const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
          <HeaderRoot>
      <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <GlobalStyle />
            <Link href="/" passHref>
              <Anchor as="a">
                <AppLogo />
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search" passHref>
                <Anchor as="a">すべて</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/clothes" passHref>
                <Anchor as="a">トップス</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/book" passHref>
                <Anchor as="a">本</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/shoes" passHref>
                <Anchor as="a">シューズ</Anchor>
              </Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Box display={{ base: "block", md: "none" }}>
              <Link href="/search" passHref>
                <Anchor as="a">
                  <SearchIcon />
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Link href="/cart" passHref>
              <Anchor as="a">
                <BadgeIconButton
                  icon={<ShoppingCartIcon size={24} />}
                  size="24px"
                  badgeContent={cart.length === 0 ? undefined : cart.length}
                  badgeBackgroundColor="primary"
                />
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            {(() => {
              // 認証していたらアイコンを表示
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref>
                    <Anchor as="a">
                      {/* shapeImage data-testid属性 ----- テストを行うために使用する */}
                      <ShapeImage
                        alt=''
                        shape="circle"
                        src={authUser.profileImageUrl}
                        width={24}
                        height={24}
                        data-testid="profile-shape-image"
                      />
                    </Anchor>
                  </Link>
                );
              } else if (isLoading) {
                // ロード中はスピナーを表示
                return <Spinner size={20} strokeWidth={2} />;
              } else {
                // サインインしてない場合はアイコンを表示
                return (
                  <Link href="/signin" passHref>
                    <Anchor as="a">
                      <PersonIcon size={24} />
                    </Anchor>
                  </Link>
                );
              }
            })()}
          </NavLink>
          <NavLink>
            <Link href="/sell" passHref>
              <Button as="a">出品</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
    </ThemeProvider>

  );
};

export default Header;
