import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { AppTextField } from '../../components/common/AppTextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { AppHeader } from '../../components/common/AppHeader';
import { ForgotPasswordRequest } from '../../types/auth';
import { ValidationMessages, isValidEmail } from '../../utils/validators';

export const ForgotPasswordScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({ defaultValues: { email: '' } });

  const onSubmit = async (_data: ForgotPasswordRequest) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader title="Forgot Password" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + Spacing[6] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isSent ? (
          <View style={styles.successContainer}>
            <View
              style={[styles.iconWrapper, { backgroundColor: theme.colors.primaryContainer }]}
            >
              <Mail size={48} color={theme.colors.primary} strokeWidth={1.5} />
            </View>
            <Text style={[styles.successTitle, { color: theme.colors.onSurface }]}>
              Email Sent!
            </Text>
            <Text style={[styles.successDesc, { color: theme.colors.onSurfaceVariant }]}>
              We've sent a password reset link to your email. Please check your inbox and
              follow the instructions.
            </Text>
            <PrimaryButton
              title="Back to Sign In"
              onPress={() => router.replace('/auth/login')}
              style={styles.backButton}
            />
          </View>
        ) : (
          <>
            <View
              style={[styles.iconWrapper, { backgroundColor: theme.colors.primaryContainer }]}
            >
              <Mail size={48} color={theme.colors.primary} strokeWidth={1.5} />
            </View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Reset Password
            </Text>
            <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
              Enter your registered email address and we'll send you a link to reset your
              password.
            </Text>

            <View style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: ValidationMessages.required,
                  validate: (v) => isValidEmail(v) || ValidationMessages.email,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppTextField
                    label="Email Address"
                    placeholder="Enter your registered email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                  />
                )}
              />

              <PrimaryButton
                title="Send Reset Link"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                style={styles.submitButton}
              />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[6],
    alignItems: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[5],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: Spacing[2],
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[6],
  },
  formCard: {
    width: '100%',
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[6],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  submitButton: {
    width: '100%',
    paddingVertical: Spacing[4],
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: Spacing[6],
  },
  successTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: Spacing[3],
  },
  successDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[8],
  },
  backButton: {
    minWidth: 200,
    paddingVertical: Spacing[4],
  },
});
