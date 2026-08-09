import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageSquare } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { EmptyState } from '../../components/common/EmptyState';
import { Avatar } from '../../components/common/Avatar';
import { DUMMY_CONVERSATIONS } from '../../constants/dummyData';
import { Conversation } from '../../types/chat';
import { formatChatTime } from '../../utils/formatters';

export const ChatScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={[styles.conversationItem, { borderBottomColor: theme.colors.divider }]}
      activeOpacity={0.85}
    >
      <View style={styles.avatarWrapper}>
        <Avatar uri={item.participantAvatar} name={item.participantName} size={52} />
        {item.unreadCount > 0 && (
          <View style={[styles.onlineDot, { backgroundColor: theme.colors.success }]} />
        )}
      </View>

      <View style={styles.conversationBody}>
        <View style={styles.conversationTop}>
          <Text style={[styles.participantName, { color: theme.colors.onSurface }]}>
            {item.participantName}
          </Text>
          <Text style={[styles.timeText, { color: theme.colors.placeholder }]}>
            {formatChatTime(item.lastMessageTime)}
          </Text>
        </View>

        {item.propertyTitle && (
          <Text
            style={[styles.propertyLabel, { color: theme.colors.primary }]}
            numberOfLines={1}
          >
            Re: {item.propertyTitle}
          </Text>
        )}

        <View style={styles.conversationBottom}>
          <Text
            style={[
              styles.lastMessage,
              {
                color:
                  item.unreadCount > 0
                    ? theme.colors.onSurface
                    : theme.colors.onSurfaceVariant,
                fontFamily:
                  item.unreadCount > 0 ? 'Poppins-Medium' : 'Poppins-Regular',
              },
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.unreadCount, { color: theme.colors.onPrimary }]}>
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing[4],
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Messages</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Chat with property owners
        </Text>
      </View>

      <FlatList
        data={DUMMY_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing[6] }}
        ListEmptyComponent={
          <EmptyState
            icon={MessageSquare}
            title="No messages yet"
            description="When you enquire about a property, your conversation with the owner will appear here."
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    marginBottom: Spacing[1],
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    borderBottomWidth: 0.5,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing[3],
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationBody: {
    flex: 1,
  },
  conversationTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  participantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
  },
  propertyLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginBottom: 2,
  },
  conversationBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 13,
    flex: 1,
    marginRight: Spacing[2],
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },
});
